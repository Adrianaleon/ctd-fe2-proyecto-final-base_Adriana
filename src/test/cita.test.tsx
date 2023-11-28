import { screen, waitFor, fireEvent } from "@testing-library/react";
import Cita from "../features/quote/Cita";
import { render } from "../test-util";
import { server } from "../mocks/server";


describe('Test <Cita />', () => {

  beforeAll(() => server.listen()); 
  afterEach(() => server.resetHandlers()); 
  afterAll(() => server.close()); 



  test('render Cita component', ()=>{
    render(<Cita />);

    const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
    const obtenerCitaButton = screen.getByRole("button", { name: /Obtener cita aleatoria/i });

    expect(input).toBeInTheDocument();
    expect(obtenerCitaButton).toBeInTheDocument();
  });

  test('Mostrar mensaje de error al ingresar un nombre errado', async() => {
    render(< Cita />);
    
    const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
    const obtenerCitaButton = screen.getByRole("button", { name: /Obtener cita aleatoria/i });

    fireEvent.change(input, {target:{value: "Nombre incorrecto"}});
    fireEvent.click(obtenerCitaButton)

    await waitFor(()=> {
       const errorMessage = screen.getByText(/Por favor ingrese un nombre válido/i);
       expect(errorMessage).toBeInTheDocument();
    })
  });
   test ('Obtener cita al azar al hacer clic en el botón sin ingresar nombre', async()=> {
    render (<Cita />)
    
    const obtenerCitaButton = screen.getByRole("button", { name: /Obtener Cita aleatoria/i });  

   
    fireEvent.click(obtenerCitaButton);
    
    await waitFor(()=>{
      const textoCita = screen.getByText(/Obtener Cita aleatoria/i);
      expect(textoCita).toBeInTheDocument();
    });  
  });   

    test('Obtener una cita especifica al ingrear un nombre y hacer clic en "Obtener Cita"',
    async ()=>{
      render(<Cita />);

      const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
      const obtenerCitaButton = screen.getByRole ("button",{name:/Obtener cita aleatoria/i });

      fireEvent.change(input,{target:{value:"Lisa Simpson"}});
      fireEvent.click(obtenerCitaButton);

      await waitFor(()=>{
        const citaText=screen.getByText(/Obtener cita/i);
        expect (citaText).toBeInTheDocument();
      });
    
    });  
    
    test('Mostrar mensaje de error al hacer clic en "Obtener Cita"con nombre vacio', async()=>{

      render(<Cita/>)
      const input = screen.getByPlaceholderText(/Ingresa el nombre del autor/i);
      const obtenerCitaButton = screen.getByRole("button", { name: /Obtener cita aleatoria/i });
  
      fireEvent.change(input, {target:{value: "Nombre vacio"}});
      fireEvent.click(obtenerCitaButton)
  
      await waitFor(()=> {
         const errorMessage = screen.getByText(/Por favor ingrese un nombre válido/i);
         expect(errorMessage).toBeInTheDocument();
      })
    }
    )
  })
    


