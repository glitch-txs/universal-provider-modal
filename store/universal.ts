import { windowUtils } from "@/utils/window";
import { WalletConnectModal } from "@walletconnect/modal";
import { UniversalProvider } from "@walletconnect/universal-provider";

const universal = () => {
  let provider: Awaited<ReturnType<typeof UniversalProvider.init>>;
  let modal: InstanceType<typeof WalletConnectModal> | undefined;
  let callback: ()=>void;
  init()

  async function init(){
    if(!process.env.NEXT_PUBLIC_PROJECT_ID) throw Error("Project ID missing")
    if(typeof window === 'undefined') return
    modal = new WalletConnectModal({projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string})
    provider = await UniversalProvider.init({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
      metadata: {
        name: windowUtils.document()?.title ?? '',
        description: windowUtils.document()?.querySelector('meta[name="description"]')?.textContent ?? "",
        url: `${windowUtils.location()}`,
        icons: [`${windowUtils.location()}favicon.ico`],
      }
    });
    provider.on("display_uri", (uri: string) => {
      getModal()?.openModal({
        uri
      })
    });
    //modal.subscribeModal(callback)
    provider.on("session_delete", ({ id, topic }: any) => {
      console.log("session_delete", id, topic);
      callback?.()
    });
    provider.on("session_event", ({ event, chainId }: any) => {
      console.log("session_event", event, chainId);
      //callback?.()
    });
    provider.on("session_update", ({ topic, params }: any) => {
      console.log("session_update", topic, params);
      //callback?.()
    });
    callback?.()
  }
  
  let subscribe = (cb: ()=> void)=>{
    callback = cb
    return ()=>{}
  }

  let getProvider = ()=> provider

  let getModal = ()=> modal

  return {
    subscribe,
    getProvider,
    getModal
  }
}

export const store = universal()