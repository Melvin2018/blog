export const MSG_ERROR = {
    status: "error",
    message: "Error en la ejecución"
}
export const data_send = (data, title = "list") => {
    let retorno = {
        status: "succces"
    }
    retorno[title] = data;
    return retorno;

}