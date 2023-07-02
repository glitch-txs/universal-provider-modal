import { store } from "@/store/universal"
import { useSyncExternalStore } from "react"

export const useWalletConenct = (projectId: string)=>{
  if(!store.getModal()) store.setProjectId(projectId)
  const provider = useSyncExternalStore(store.subscribe, store.getProvider,()=>null)
  return { 
    provider, 
    modal: store.getModal()
  }
}