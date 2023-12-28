const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const { EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const WebWhatsappProvider = require('@bot-whatsapp/provider/web-whatsapp')
const MockAdapter = require('@bot-whatsapp/database/mock')
const {Objetivos, Partes, Diseno} =require('./Documents/documents')
const {ErrorDesarrollo} = require('./Modulos/ERROS')
const { ModuloMarketing } = require('./Modulos/ModMarketing')
//const { FlowsProyecto } = require('./Flows/FlowsProyecto')

const flowOnOff = addKeyword(['OnOff284'],{ sensitive: true })
    .addAction(async (_, { flowDynamic, globalState }) => {
        const currentGlobalState = globalState.getMyState();
        if(currentGlobalState.encendido){
            await globalState.update({encendido:false})
            await flowDynamic('Acabas de apagar el Bot')
        }else{
            await globalState.update({encendido:true})
            await flowDynamic('Acabas de Encender el Bot')
        }
    })


const flujoFinal = addKeyword(EVENTS.ACTION)
    .addAnswer(['🌟 *¡Hola! Parece que te has ausentado por un tiempo.* 🚀✨',
        '','Queremos informarte que debido a la inactividad, CHARLOTTE se ha desconectado temporalmente. ¡Pero no te preocupes! Estamos aquí para ayudarte a volver a conectarte y aprovechar al máximo nuestro servicio.',
        '','Para reiniciar CHARLOTTE, simplemente envía la palabra "hola". ¡Estamos listos para atenderte y ofrecerte la mejor asistencia! Si tienes alguna pregunta o necesitas ayuda, ¡no dudes en decírnoslo!',
        '','Gracias por elegir CHARLOTTE. ¡Esperamos verte pronto! 🌈💬 #CHARLOTTE #Reactivación #AsistenciaVirtual'].join('\n'))

const FlojoPrueba = addKeyword('prueba')
    .addAction((ctx,{globalState,state,flowDynamic})=>{
        const GlobalState = globalState.getMyState()
        GlobalState.cel.sendText('573208786934@c.us','prueba de encio')
        GlobalState.cel.on('message',async(msg)=>{
            if(msg.from==='573208786934'){
                console.log(msg.body)
                await flowDynamic(msg.body)
            }
            //return 'xxxx'
            // if(msg.from==='573208786934'){
            //     await state.update({mensaje:msg.body})
            //     console.log(`esto es adentro ${state.getMyState()}`)
            // }
            
        })
        //await flowDynamic()
        //console.log(`esto es afuera ${mens}`)
        
    })
    

const FlowsEmpresas = addKeyword(['2'])
    .addAction(async(ctx,{flowDynamic})=>{
        const nombre = ctx._data.notifyName
        //console.log(nombre)
        await flowDynamic(['2.🌐💼 *Servicios Empresariales con CHARLOTTE: Tu Socio para el Éxito* 🚀🔍',
        `_*${nombre}* Descubre cómo CHARLOTTE, nuestro asesor virtual, transforma y optimiza tu experiencia empresarial a través de servicios avanzados y personalizados:_`].join('\n'))
    })
    .addAnswer(
        ['*Opciones:*',
            '..1 - 🤖 Asesoramiento de Marketing',
            '~..2 - 🖥️ Aplicación Web Empresarial~',
            '~..3 - 🗓️ Calendario de Eventos Empresariales~',
            '~..4 - 📈 Análisis de Datos Empresariales~',
            '~..5 - 🎯 Segmentación de Clientes~',
            '~..6 - 🌐 Presencia en Redes Sociales~',
            '~..7 - 🚀 Estrategias de Ventas~',
            '~..8 - 💬 Atención al Cliente Mejorada~',
            '~..9 - 🌟 Campañas de Publicidad Innovadoras~',
            '~.10 - 📊 Reportes de Desempeño~',
            '..*"Atras"* para volver'
        ],
        {capture:true},
        async(ctx,{gotoFlow,flowDynamic,fallBack})=>{
            //console.log(ctx.body)
            if(ctx.body==='Atras'){
                return gotoFlow(flowPrincipal)
            }
            if(ctx.body==='1'){
                //await setTimeout(()=>{console.log('3 segundos esperados')},10000)
                await flowDynamic('Se iniciara el modulo de Marketing. Aguarda un momento por favor')
                //return
                // await flowDynamic('.........')
                // await flowDynamic('.........')
                return gotoFlow(ModuloMarketing)

            }else{
                await flowDynamic(ErrorDesarrollo(ctx._data.notifyName))
            }
            return fallBack()
        },[]
    )
    

const FlowsProyecto = addKeyword(['1'])
    .addAction(async(ctx,{flowDynamic})=>{
        const nombre = ctx._data.notifyName
        //console.log(nombre)
        await flowDynamic(['*1.INFORMACION GENERAL:*',
        `_*${nombre}* Descubre más sobre *Conexión Empresarial 360° - Proyecto Órbita* y cómo transformamos tu experiencia empresarial._`].join('\n'))
    })
    .addAnswer(
        [
        '*Opciones:*',
        '..1🎯 Objetivo.',
        '..2🤝 Partes Involucradas.',
        '..3🏗️ Diseño y Arquitectura.',
        '..*"Atras"* para volver'
        ],
        {capture:true},
        async(ctx,{gotoFlow,flowDynamic,fallBack})=>{
            if(ctx.body==='Atras'){
                return gotoFlow(flowPrincipal)
            }
            if(ctx.body==='1'){
                 await flowDynamic(Objetivos)
            }else if(ctx.body==='2'){
                await flowDynamic(Partes)
            }else if(ctx.body==='3'){
                await flowDynamic(Diseno)
            }else{
                await flowDynamic(ErrorDesarrollo(ctx._data.notifyName))
            }
            return fallBack()
        },
    )
    


const flowPrincipal = addKeyword(['hola', 'ole', 'alo','menu'])
    .addAction((_, { endFlow, globalState }) => {

        const currentGlobalState = globalState.getMyState();
        if (!currentGlobalState.encendido) {
            return endFlow(['🛠️⚙️ **¡Actualización en Progreso!** ⚙️🔧',
            '',
            '¡Estimado usuario! Queremos informarte que estamos trabajando arduamente en una emocionante actualización para mejorar tu experiencia con nuestro bot. 🌟 Durante este proceso, el bot estará temporalmente suspendido.',
            '',
            'No te preocupes, esta breve pausa es para brindarte funciones mejoradas y emocionantes. Estamos comprometidos a hacer que tu interacción con nosotros sea aún más excepcional.',
            '',
            'Agradecemos tu paciencia y comprensión. Estamos ansiosos por presentarte la versión mejorada muy pronto. ¡Vuelve pronto para descubrir todas las novedades! 🚀🤖 #ActualizaciónEnProgreso #MejorasEnCamino'].join('\n'));
        }
    })
    .addAction(async(ctx,{flowDynamic})=>{
        const nombre = ctx._data.notifyName
        //console.log(nombre)
        await flowDynamic(`_¡Hola *${nombre}*! Soy *CHARLOTTE*, tu asesora virtual. ¿Listo para explorar las maravillas del Proyecto Órbita?_`)
    })
    .addAnswer(
        ['*Opciones:*',
            '..1 - ℹ️ Información General sobre el Proyecto.',
            '..2 - 🏢 Servicios Empresariales.',
            '~..3 - 🏡 Servicios Domésticos.~',
            '~..4 - 🎓 Servicios Profesionales.~'
        ],null,null,[FlowsProyecto,FlowsEmpresas]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,ModuloMarketing,flowOnOff])
    const adapterProvider = createProvider(WebWhatsappProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },
    {
      globalState: {
        cel:adapterProvider,
        encendido: true,
      }
    }
    )
    QRPortalWeb()
}

main()

module.exports={
    flowPrincipal,
    FlowsEmpresas
}
