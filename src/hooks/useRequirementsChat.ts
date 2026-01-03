import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage, Requirements, ParseResponse } from '@/types/requirements';
import { useToast } from '@/hooks/use-toast';

const emptyRequirements: Requirements = {
  projectName: null,
  description: null,
  users: [],
  pages: [],
  dataModels: [],
  workflows: [],
  features: []
};

export function useRequirementsChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [requirements, setRequirements] = useState<Requirements | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { toast } = useToast();

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const { data, error } = await supabase.functions.invoke('parse-requirements', {
        body: { 
          messages: chatMessages,
          currentRequirements: requirements
        }
      });

      if (error) throw error;

      const response = data as ParseResponse;

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        requirements: response.requirements,
        changes: response.changes
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (response.requirements) {
        setRequirements(prev => ({
          ...emptyRequirements,
          ...prev,
          ...response.requirements
        }));
      }

      // Reset confirmation if requirements changed
      if (response.changes && response.changes.length > 0) {
        setIsConfirmed(false);
      }

    } catch (error: any) {
      console.error('Error parsing requirements:', error);
      
      let errorMessage = 'Failed to process your message. Please try again.';
      if (error.message?.includes('429')) {
        errorMessage = 'Rate limit reached. Please wait a moment and try again.';
      } else if (error.message?.includes('402')) {
        errorMessage = 'Usage limit reached. Please add credits to continue.';
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });

      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, requirements, toast]);

  const updateRequirements = useCallback((newRequirements: Requirements) => {
    setRequirements(newRequirements);
    setIsConfirmed(false);
  }, []);

  const confirmRequirements = useCallback(() => {
    setIsConfirmed(true);
    toast({
      title: 'Requirements Confirmed',
      description: 'You can now proceed to build your application.'
    });
  }, [toast]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setRequirements(null);
    setIsConfirmed(false);
  }, []);

  return {
    messages,
    requirements,
    isLoading,
    isConfirmed,
    sendMessage,
    updateRequirements,
    confirmRequirements,
    resetChat
  };
}
