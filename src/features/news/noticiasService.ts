import {obtenerNoticias, INoticias} from "./fakeRest"

export interface INoticiasNormalizadas {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
  }

 export interface INoticiasService {
    fetchNoticias(): Promise<INoticiasNormalizadas []>;
 }

 export const noticiasService:INoticiasService ={
    fetchNoticias:async():Promise<INoticiasNormalizadas[]> => {
        const respuesta = await obtenerNoticias();
        return formatData (respuesta);
    }
 }

 export const formatData =(data:INoticias[]): INoticiasNormalizadas[]=>{
    return data.map((noticia)=>({
        id: noticia.id,
        titulo:formatTitulo(noticia.titulo),
        descripcion: noticia.descripcion,
        fecha: formatFecha(noticia.fecha),
        esPremium: noticia.esPremium,
        imagen: noticia.imagen,
        descripcionCorta: noticia.descripcion.substring(0, 100),
    }))
 }
 export const formatTitulo =(titulo:string):string=>{
    return titulo
    .split(" ")
    .map((str)=> {return str.charAt(0).toUpperCase()+ str.slice(1)}).join(" ");

 };

 export const formatFecha =(fecha:Date):string=>{
    return fecha.toLocaleString();
 }