import { namespaces } from '@/constants/namespaces'
import { useWalletConenct } from './useWalletConnect'
import { useEffect, useState } from 'react'

export const useConnect = () => {
  
  const { provider, modal } = useWalletConenct()
  const [isConnecting, setIsConnecting] = useState<boolean>(false)

  useEffect(()=>modal?.subscribeModal(({ open })=>setIsConnecting(open)),[])

  async function connect(){
    if(!provider || !modal) return
    setIsConnecting(true)
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