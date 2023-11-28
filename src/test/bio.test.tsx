import React from 'react';
import {screen, fireEvent} from '@testing-library/react'
import { INFO_SIMPSONS, NombresSimpsons } from '../features/bio/constants';
import { render } from '../test-util';
import Bio from '../features/bio/Bio';


describe ('Bio Component',()=>{
    test('Renderizar botones con nombres de personajes', ()=>{
        render(<Bio/>);
    const buttons = Object.keys(INFO_SIMPSONS);
    buttons.forEach((button)=>{
    const nombreBoton =screen.getByText(button);
    expect(nombreBoton).toBeInTheDocument();
    });
    });
    test('Actualiza la bio', ()=>{
        render(<Bio/>)
        const bartButton = screen.getByText(NombresSimpsons.BART);
        fireEvent.click(bartButton);
        const bartBio = INFO_SIMPSONS[NombresSimpsons.BART];
        const bioNombre = screen.getByText(bartBio.nombre);
        expect(bioNombre).toBeInTheDocument();
    });
});