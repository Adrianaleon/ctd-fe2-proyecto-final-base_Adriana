import { useState } from "react";
import { INoticiasNormalizadas } from "./noticiasService";

/**
 * Hook personalizado para el manejo del modal en el componente de noticias
 * @returns {Object} - Objeto con propiedades y funciones para manejar el modal
 */
export const useModal=()=>{
    const [modal,setModal]=useState<INoticiasNormalizadas|null>(null);
  /**
   * Función para abrir el modal con una noticia específica
   * @param {INoticiasNormalizadas} item - Noticia a mostrar en el modal
   */
    const openModal =(item:INoticiasNormalizadas) =>{
        setModal(item);

    };
/** 
 * Función para cerrar el modal actual
 */
    const closeModal =()=>{
        setModal(null);
    };

   return {modal,openModal, closeModal};
}

