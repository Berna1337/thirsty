//Verificar se o browser suporta notificacoes
function isPushNotificationSupported(){
    return "serviceWorker" in navigator && "PushManager" in window
}

//Para tratar das notificacoes precisamos de registar um serviceWorker
//Regista um ficheiro que e suposto ficar na pasta do nosso projeto
//Retorna uma promise quuue resolve a serviceWorkerRegister
function registerServiceWorker(){
    return navigator.serviceWorker.register("/sw.js")
}

//User dar a sua permissao
//Tem um dos 3 valores : default, negado, garantido
async function askUserPermission(){
    return await Notification.requestPermission()
}

sendNotification(
    PushSubscription, 
    JSON.stringify({
        title: "FASF",
        text:fafa,
        image: "ad",
        tag: "",
        url: "asda"
    })
)

