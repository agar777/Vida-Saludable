export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    ruta:string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'info',
        icon: 'bi bi-egg-fried',
        title: 'Alimentación',
        ruta: '/dashboard/remedios/alimentacion'
    }, 
    {
        bgcolor: 'info',
        icon: 'bi bi-droplet',
        title: 'Agua',
        ruta: '/dashboard/remedios/agua'

    }, 
    {
        bgcolor: 'info',
        icon: 'bi bi-bicycle',
        title: 'Ejercicio',
        ruta: '/dashboard/remedios/ejercicio'

    },
    {
        bgcolor: 'info',
        icon: 'bi bi-brightness-high',
        title: 'Luz Solar',
        ruta: '/dashboard/remedios/luz-solar'

    },
    {
        bgcolor: 'info',
        icon: 'bi bi-moon-stars-fill',
        title: 'Descanso',
        ruta: '/dashboard/remedios/descanso'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-heart-pulse',
        title: 'Esperanza',
        ruta: '/dashboard/remedios/esperanza'
    },

] 