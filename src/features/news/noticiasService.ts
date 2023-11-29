import {obtenerNoticias, INoticias} from "./fakeRest"

/**
 * Interfaz que define la estructura de las noticias normalizadas
 */
export interface INoticiasNormalizadas {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
  }
/**
 * Interfaz que define el servicio de noticias con el método para obtener noticias
 */
 export interface INoticiasService {
    fetchNoticias(): Promise<INoticiasNormalizadas []>;
 }
/**
 * Implementación del servicio de noticias con la función para obtener noticias normalizadas
 */
 export const noticiasService:INoticiasService ={
   /**
   * Método para obtener noticias normalizadas a partir de datos brindados por el servicio
   * @returns {Promise<INoticiasNormalizadas[]>} - Promesa que resuelve en un arreglo de noticias normalizadas
   */
    fetchNoticias:async():Promise<INoticiasNormalizadas[]> => {
        const respuesta = await obtenerNoticias();
        return formatData (respuesta);
    }
 }
/**
 * Función para formatear los datos de noticias a un formato normalizado
 * @param {INoticias[]} data - Arreglo de noticias a formatear
 * @returns {INoticiasNormalizadas[]} - Arreglo de noticias normalizadas
 */
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
 /**
 * Función para dar formato al título de una noticia
 * @param {string} titulo - Título de la noticia
 * @returns {string} - Título con formato específico
 */
 export const formatTitulo =(titulo:string):string=>{
    return titulo
    .split(" ")
    .map((str)=> {return str.charAt(0).toUpperCase()+ str.slice(1)}).join(" ");

 };
/**
 * Función para dar formato a la fecha de una noticia
 * @param {Date} fecha - Fecha de la noticia
 * @returns {string} - Fecha con un formato específico
 */
 export const formatFecha =(fecha:Date):string=>{
    return fecha.toLocaleString();
 }