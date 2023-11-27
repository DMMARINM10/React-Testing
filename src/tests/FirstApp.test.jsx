import { render, screen } from "@testing-library/react"
import { FirstApp } from "../FirstApp"

describe('Tests on FirstApp component', () => {
    test('FirstApp component should be equal to snapshot', () => { 
        //render component in memory
        const title = 'Hola Mundo'
        const { container } = render(<FirstApp title={title}/>)
        expect(container).toMatchSnapshot()
    })

    test('title prop should be printed in Component', () => {
        const title = 'Hola Mundo'
        //get node by text
        //getBy just bring one element and throw error if there are multiple, in that case gettAllBy (array)
        const { container, getByText, getByTestId } = render(<FirstApp title={title}/>)
        expect(getByText(title)).toBeTruthy() //it is found, it exists

        //not used as much
        const h1 = container.querySelector('h1')
        expect(h1.innerHTML).toContain(title)

        //screen es el objecto que recibo del render dentro del body
        //renderizado del comp actualizado luego de cambios en el DOM
        expect(screen.getByRole('heading', { level: 1 } ).innerHTML).toContain(title)

        expect(getByTestId('title').innerHTML).toBe(title)
    })
})