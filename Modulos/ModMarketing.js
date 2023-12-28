const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
//const {FlowsEmpresas,flowPrincipal}=require('../app')
// const { EVENTS } = require('@bot-whatsapp/bot')
// const QRPortalWeb = require('@bot-whatsapp/portal')
// const WebWhatsappProvider = require('@bot-whatsapp/provider/web-whatsapp')
// const MockAdapter = require('@bot-whatsapp/database/mock')
// const {ErrorDesarrollo} = require('./Modulos/ERROS')


const ModuloMarketing = addKeyword(['mark123'],{ sensitive: true })
    .addAnswer('.....',{delay:3000})
    .addAnswer('.....',{delay:3000})
    .addAnswer('🚀🌟 *¡Potencia tu Mensaje con el Asistente de Marketing de LUZ DE INNOVACION!*🌟🤖',{delay:3000})
    .addAnswer(['¡Bienvenido a una experiencia de difusión innovadora para tu producto! 🚀💡',
        'Nuestro Asistente de Marketing está aquí para simplificar el proceso y crear mensajes que destaquen. 🌐✨'])
    .addAnswer(['1🏢 *Sobre tu Empresa*:',
        '',
        "Para empezar, cuéntanos sobre tu empresa. Queremos conocerte mejor y entender tu esencia empresarial."]
        .join('\n'),
        {delay:5000}
    )
    .addAnswer('*Nombre de tu Empresa:*',
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Nombre:ctx.body})
            return
        }
    )
    .addAnswer('*Direccion de tu Empresa:*',
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Direccion:ctx.body})
            return
        }
    )
    .addAnswer('*Describeme brevemente tu Empresa:*',
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Descripcion:ctx.body})
            return
        }
    )
    .addAnswer(['🛍️ Producto Estrella:',
        '',
        'Ahora, háblanos sobre ese producto especial que deseas destacar. ¿Qué lo hace único?'].join('\n'),
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Producto:ctx.body})
            return
        }
    )
    .addAnswer(['🎯 Público Objetivo:',
        '',
        'Personalización es clave. Cuéntanos sobre tu audiencia ideal, los que harán que tu producto brille.'].join('\n'),
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Publico:ctx.body})
            return
        }
    )
    .addAnswer(['🚀 Propósito de la Campaña:',
        '',
        '¿Cuál es tu objetivo? Aumentar ventas, generar interés o quizás promocionar un evento único. Cuéntanos tus metas.'].join('\n'),
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Proposito:ctx.body})
            return
        }
    )
    .addAnswer(['📝 Estilo de Mensaje:',
        '',
        'Ahora, elige el tono que resonará con tu audiencia. ¿Informativo, humorístico o emocional'].join('\n'),
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Estilo:ctx.body})
            return
        }
    )
    .addAnswer(['🌟 Elementos Clave del Producto:',
        '',
        'Identifica los puntos fuertes de tu producto. Vamos a destacar lo que hace brillar a tu marca._(Si no sabes que responder, puedes enviar un "No")_'].join('\n'),
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Claves:ctx.body})
            return
        }
    )
    .addAnswer(['💰 Ofertas o Descuentos:',
        '',
        'Si hay ofertas irresistibles, inclúyelas. El toque final para cautivar a tu audiencia._(Opcional: en caso de no tener oferta o descuento, enviar un: "No")_'].join('\n'),
        {capture:true},
        async (ctx, {state}) => {
            await state.update({Promo:ctx.body})
            return
        }
    )
    .addAction(async(_,{flowDynamic,state})=>{
        const Empresa = state.getMyState()
        await flowDynamic(['👌 Confirmación de Información:','',`Perfecto, estamos creando un mensaje para ${Empresa.Producto}, dirigido a ${Empresa.Publico} con el propósito de ${Empresa.Proposito}, utilizando un estilo ${Empresa.Estilo}. Resaltaremos ${Empresa.Claves}.`])
    })
    .addAnswer(['✨ Generación del Mensaje:','CHARLOTTE despliega su magia, creando un mensaje irresistible y único para tu marca.','esto puede tardar unos minutos, _ten paciencia, lo bueno siempre se hace esperar👌_'].join('\n'
    ))
    .addAction(async (ctx, { flowDynamic, state, globalState }) => {
        const GlobalState = globalState.getMyState();
        const Empresa = state.getMyState();
    
        const mensajeEnv = `elabora un mensaje para la difusión del siguiente Producto:${Empresa.Producto}, de ${Empresa.Nombre}, una empresa de ${Empresa.Descripcion}, ubicada en ${Empresa.Direccion}. 
                Orienta el mensaje a un público de ${Empresa.Publico}, 
                La finalidad de este mensaje es ${Empresa.Proposito}. 
                Destaca las palabras: ${Empresa.Claves}, En el producto.
                Adicional establece una promoción: ${Empresa.Promo}.
                aplica técnicas de marketing innovadoras y efectivas, con un lenguaje ${Empresa.Estilo}, debe ser llamativo, utiliza emojis:`;
    
        // Enviar mensaje inicial
        GlobalState.cel.sendText('573229344830@c.us', `mensaje de :${ctx.from}`);
        GlobalState.cel.sendText('573229344830@c.us', mensajeEnv);
    
        // Crear una promesa que se resuelve cuando se recibe un mensaje
        const waitForMessage = new Promise((resolve) => {
            GlobalState.cel.on('message', async (msg) => {
                if (msg.from === '573229344830') {
                    //console.log(msg.body);
                    resolve(msg.body);
                }
            });
        });
    
        // Esperar a que se reciba un mensaje antes de continuar
        const result = await waitForMessage;
    
        // Continuar con el flujo dinámico
        await flowDynamic('🎉 Resultado:');
        await flowDynamic(result);
    })
    .addAnswer(['*¡Voilà!*',
        '',
        'Aquí está tu mensaje. ¿Cómo te sientes? ~¿Hay algún ajuste o adición que desees?~..',
        '_(Si buscas personalización y funciones adicionales, ¡descubre todo lo que nuestra suscripción premium tiene para ofrecer!)_:'].join('\n'))
    .addAnswer(['👋 Finalización:',
        '',
        '"Gracias por elegir nuestro servicio. *CHARLOTTE* está aquí siempre que necesites más brillo en tus mensajes.',
        '',
        'Con *CHARLOTTE*, cada mensaje es una obra maestra. Descubre el poder del marketing personalizado.',
        '💡🚀 #SISEDP #CHARLOTTE #AsesoramientoMarketing'].join('\n'),
        )
    .addAnswer('*menu* para volver',
        null,
        null,
        []
    )
        
    module.exports={
        ModuloMarketing
    }