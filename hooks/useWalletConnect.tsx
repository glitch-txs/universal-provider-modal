import { WalletConnectModal } from "@walletconnect/modal";
import { UniversalProvider } from "@walletconnect/universal-provider";
import { useSyncExternalStore } from 'react';

if(!process.env.NEXT_PUBLIC_PROJECT_ID) throw Error("Project ID missing as NEXT_PUBLIC_PROJECT_ID")

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string

const modal = new WalletConnectModal({
  projectId,
})

const universal = () => {
  let provider: Awaited<ReturnType<typeof UniversalProvider.init>>;
  const init = async(callback: ()=>void)=>{
    provider = await UniversalProvider.init({
      projectId: projectId,
      metadata: {
        name: "React App",
        description: "React App for WalletConnect",
        url: "https://walletconnect.com/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      }
    });
    provider.on("display_uri", (uri: string) => {
      modal.openModal({
        uri
      })
    });
    //modal.subscribeModal(callback)
    provider.on("session_delete", ({ id, topic }: any) => {
      console.log("session_delete", id, topic);
      callback()
    });
    provider.on("session_event", ({ event, chainId }: any) => {
      console.log("session_event", event, chainId);
      callback()
    });
    provider.on("session_update", ({ topic, params }: any) => {
      console.log("session_update", topic, params);
      callback()
    });
    callback()
  }
  
  let subscribe = (callback: ()=> void)=>{
    init(callback)
    return ()=>{}
  }

  let getProvider = ()=> provider

  return {
    subscribe,
    getProvider
  }
}

const store = universal()

export const useWalletConenct = ()=>{
  const provider = useSyncExternalStore(store.subscribe, store.getProvider,()=>null)
  return { provider, modal }
}