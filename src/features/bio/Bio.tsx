import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import styles from "./styles.module.css";
import { BotonBio } from "./bioStyle";

/**
 * Componente funcional que muestra la biografía de los personajes de los Simpsons
 */

const Bio : React.FC = () => {
   // Estado para controlar la información a mostrar
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );
/**
   * Función que actualiza el estado con la información del personaje seleccionado
   * @param {NombresSimpsons} nombre - Nombre del personaje seleccionado
   */
  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);
  /**
   * Crea los botones para seleccionar el personaje
   */
  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <BotonBio
        key={nombre as string}
        onClick={() => onClick(nombre as NombresSimpsons)}
        isPrimary = {bioActiva.id === nombre}
       >
        {nombre}
      </BotonBio>
    ));
  };

  return (
    <div className={styles.bioContainer}>
      <div className={styles.contenedorBotones}>{crearBotones()}</div>
      <div>
        <div>
          <img
            src={bioActiva.image}
            alt={bioActiva.nombre}
            className={styles.bioImagen}
          />
        </div>
        <div>
          <h3 className={styles.bioNombre}>{bioActiva.nombre}</h3>
          <p className={styles.bioDescripcion}>{bioActiva.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
