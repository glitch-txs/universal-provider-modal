import { windowUtils } from "@/utils/window";
import { WalletConnectModal } from "@walletconnect/modal";
import { UniversalProvider } from "@walletconnect/universal-provider";

const universal = () => {
  let provider: Awaited<ReturnType<typeof UniversalProvider.init>>;
  let modal: InstanceType<typeof WalletConnectModal> | undefined;
  let projectId: string;

  const init = async(callback: ()=>void)=>{
    if(!projectId) throw Error("Project ID missing")
    provider = await UniversalProvider.init({
      projectId,
      metadata: {
        name: document?.title,
        description: document?.querySelector('meta[name="description"]')?.textContent ?? "",
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
      //callback()
    });
    provider.on("session_event", ({ event, chainId }: any) => {
      console.log("session_event", event, chainId);
      //callback()
    });
    provider.on("session_update", ({ topic, params }: any) => {
      console.log("session_update", topic, params);
      //callback()
    });
    callback()
  }
  
  let subscribe = (callback: ()=> void)=>{
    init(callback)
    return ()=>{}
  }

  let getProvider = ()=> provider

  let getModal = ()=> modal

  let setProjectId = (id: string) => {
    projectId = id
    modal = new WalletConnectModal({
      projectId: id,
    })
  }

  return {
    subscribe,
    getProvider,
    setProjectId,
    getModal
  }
}

export const store = universal()