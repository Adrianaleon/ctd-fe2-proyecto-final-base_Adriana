import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";

import {
  CloseButton,
  TarjetaModal,
  ContenedorModal,
  DescripcionModal,
  ImagenModal,
  TituloModal,
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
  BotonSuscribir,
  CotenedorTexto,
} from "./styled";

 // Importación de la interface para el servicio de noticias
import {INoticiasNormalizadas, INoticiasService} from "./noticiasService";
//Importación del hook personalizado useModal para manejar el modal 
import { useModal } from "./useModel";


/**componente de noticias
 * @param{Object} props - propiedades del componente
 * @param { INoticiasService} props.noticiasService -servicio de noticias para obtener datos
 * @Author Adriana León
 */
const Noticias = ({noticiasService}:{noticiasService:INoticiasService}) => {
  //Estado para almacenar las noticias obtenidas del servicio
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  //Hook personalizado useModal para gestionar el estado del modal
  const {modal, openModal, closeModal} = useModal();

  //Efecto para obtener noticias
  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await noticiasService.fetchNoticias();
      setNoticias(respuesta);
    };
     
    obtenerInformacion();
  }, [noticiasService]);
// funcion para manejar la apertura del modal con una noticia especifica
  const handleOpenModal =(listNew:INoticiasNormalizadas) =>{
    openModal(listNew)
  }

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((listNew) => (
          <TarjetaNoticia key={listNew.id}>
            <ImagenTarjetaNoticia src={listNew.imagen} />
            <TituloTarjetaNoticia>{listNew.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{listNew.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>
              {listNew.descripcionCorta}
            </DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => handleOpenModal(listNew)}>Ver más</BotonLectura>
          </TarjetaNoticia>
        ))}
        {modal ? (
          modal.esPremium ? (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => closeModal()}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
                <CotenedorTexto>
                  <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
                  <DescripcionModal>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                  </DescripcionModal>
                  <BotonSuscribir
                    onClick={() =>
                      setTimeout(() => {
                        alert("Suscripto!");
                        closeModal();
                      }, 1000)
                    }
                  >
                    Suscríbete
                  </BotonSuscribir>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
          ) : (
            <ContenedorModal>
              <TarjetaModal>
                <CloseButton onClick={() => closeModal()}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImagenModal src={modal.imagen} alt="news-image" />
                <CotenedorTexto>
                  <TituloModal>{modal.titulo}</TituloModal>
                  <DescripcionModal>{modal.descripcion}</DescripcionModal>
                </CotenedorTexto>
              </TarjetaModal>
            </ContenedorModal>
          )
        ) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
