import { store } from "@/store/universal"
import { useSyncExternalStore } from "react"

export const useWalletConenct = ()=>{
  const provider = useSyncExternalStore(store.subscribe, store.getProvider,()=>null)
  return { 
    provider, 
    modal: store.getModal()
  }
}