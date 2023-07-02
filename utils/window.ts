export const windowUtils = {
  location: ()=>{
    if(typeof window !== 'undefined'){
      return window.location.href
    }
    return ''
  }
}