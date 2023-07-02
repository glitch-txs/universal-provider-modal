export const namespaces = {
  namespaces: {
    eip155: {
      methods: [
        "eth_sendTransaction",
        "personal_sign",
      ],
      chains: ["eip155:1"],
      events: ["chainChanged", "accountsChanged"],
      rpcMap: {
        1:
        `https://rpc.walletconnect.com?chainId=eip155:1&projectId=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
      },
    }
  },
  optionalNamespaces:{
    eip155: {
      methods: [
        "eth_sendTransaction",
        "personal_sign",
      ],
      chains: ["eip155:56", "eip155:137"],
      events: ["chainChanged", "accountsChanged"],
    }
  }
}