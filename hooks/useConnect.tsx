import { namespaces } from '@/constants/namespaces'
import { useWalletConenct } from './useWalletConnect'
import { useState } from 'react'

type Props = {
  projectId: string
}

export const useConnect = ({ projectId }: Props) => {
  
  const { provider, modal } = useWalletConenct(projectId)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)

  async function connect(){
    if(!provider || !modal) return
    setIsConnecting(true)
    modal.subscribeModal(({ open })=>setIsConnecting(open))
    await provider.connect(namespaces).catch(console.error)
    modal.closeModal()
  }
  
  function disconnect(){
    provider?.session && provider.disconnect()
  }
  return { 
    connect, 
    disconnect,
    isConnecting,
    provider
  }
}