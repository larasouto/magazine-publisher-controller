'use client'

import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useChat } from 'ai/react'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'

export const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <Card.Root className="w-[560px]">
      <Card.Header>
        <Card.Title>Atendimento Online</Card.Title>
        <Card.Description>
          Converse com um de nossos atendentes.
        </Card.Description>
      </Card.Header>
      <ScrollArea className="h-[500px] w-full">
        <Card.Content className="space-y-3 mr-4">
          <div className="flex gap-3 text-slate-700 text-sm">
            <Avatar.Root>
              <Avatar.Fallback>LS</Avatar.Fallback>
              <Avatar.Image src="https://xsgames.co/randomusers/assets/avatars/female/1.jpg" />
            </Avatar.Root>
            <p className="leading-relaxed">
              <span className="block font-bold text-slate-700">
                <strong>Atendente Virtual</strong>
              </span>
              Olá, como posso ajudar você?
            </p>
          </div>

          {messages.map((message) => (
            <div key={message.id} className="flex gap-3 text-slate-700 text-sm">
              {message.role === 'user' && (
                <Avatar.Root>
                  <Avatar.Fallback>MD</Avatar.Fallback>
                  <Avatar.Image src="https://xsgames.co/randomusers/assets/avatars/male/19.jpg" />
                </Avatar.Root>
              )}

              {message.role === 'assistant' && (
                <Avatar.Root>
                  <Avatar.Fallback>LS</Avatar.Fallback>
                  <Avatar.Image src="https://xsgames.co/randomusers/assets/avatars/female/1.jpg" />
                </Avatar.Root>
              )}

              <p className="leading-relaxed">
                <span className="block font-bold text-slate-700">
                  <strong>
                    {message.role === 'user'
                      ? 'Matheus Dias'
                      : 'Atendente Virtual'}
                  </strong>
                </span>
                {message.content}
              </p>
            </div>
          ))}
        </Card.Content>
      </ScrollArea>
      <Card.Footer>
        <form className="flex gap-3 w-full" onSubmit={handleSubmit}>
          <Input
            placeholder="Digite sua mensagem"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Card.Footer>
    </Card.Root>
  )
}
