const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const WebWhatsappProvider = require('@bot-whatsapp/provider/web-whatsapp')
const MockAdapter = require('@bot-whatsapp/database/mock')
const {Objetivos, Partes, Diseno} =require('./Documents/documents')
const {ErrorDesarrollo} = require('./Modulos/ERROS')
//const { FlowsProyecto } = require('./Flows/FlowsProyecto')




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
                await flowDynamic('vamos aqui para iniciar el bot de marketing')
           }else{
                await flowDynamic(ErrorDesarrollo(ctx._data.notifyName))
            }
            return fallBack()
        },
    )
    

const FlowsProyecto = addKeyword(['1'])
    .addAction(async(ctx,{flowDynamic})=>{
        const nombre = ctx._data.notifyName
        //console.log(nombre)
        await flowDynamic(['*1.INFORMACION GENERAL:*',
        `_*${nombre}* Descubre más sobre el proyecto Conexión Empresarial 360° - Proyecto Órbita y cómo transformamos tu experiencia empresarial._`].join('\n'))
    })
    .addAnswer(
        [
        '*Opciones:*',
        '..1🎯 Objetivo del Proyecto.',
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
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(WebWhatsappProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },
    {
      globalState: {
        action:addKeyword,
        encendido: true,
      }
    }
    )
    QRPortalWeb()
}

main()

module.exports={
    flowPrincipal
}