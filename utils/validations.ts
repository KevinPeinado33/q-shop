const REGEX_VALID = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const isValidEmail = (email: string): boolean => {
  
    const match = String( email )
                        .toLowerCase()
                        .match( REGEX_VALID )
  
    return !!match

}
  
export const isEmail = (email: string): string | undefined => {
    return isValidEmail( email ) 
                    ? undefined
                    : 'El correo no parece ser válido'
}
  