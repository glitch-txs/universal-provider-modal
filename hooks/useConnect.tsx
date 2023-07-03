import { namespaces } from '@/constants/namespaces'
import { useWalletConenct } from './useWalletConnect'
import { useState } from 'react'

export const useConnect = () => {
  
  const { provider, modal } = useWalletConenct()
  const a = useWalletConenct()
  const b = useWalletConenct()
  const c = useWalletConenct()
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