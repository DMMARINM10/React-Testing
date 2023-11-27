import { fireEvent, render, screen } from "@testing-library/react"
import { CounterApp } from "../CounterApp"

describe('Tests on CounterApp component', () => {
    const value = 100

    test('CounterApp component should be equal to snapshot', () => {
        const { container } = render(<CounterApp value={value}/>)
        expect(container).toMatchSnapshot()
    })

    test('CounterApp should contain prop value in h2 tag', () => {
        const { container } = render(<CounterApp value={value}/>)
        const h2 = container.getElementsByTagName('h2')[0].innerHTML
        expect(h2).toContain(`${value}`)
    })

    test('value add +2 after clicking twice in +1 button', () => {
        //aria-labelly can be used with getByRole name, otherwise will retrieve button content as name
        //screen.debug() prints body
        render(<CounterApp value={value}/>)
        const button = screen.getByRole('button', { name: '+1'})
        const h2 = screen.getByRole('heading', { level: 2 })
        fireEvent.click(button)
        // screen.debug()
        fireEvent.click(button)
        // screen.debug()
        expect(h2.innerHTML).toContain('102')
    })

    test('value reset to initial value after clicking in reset button', () => {
        //aria-labelly can be used with getByRole name, otherwise will retrieve button content as name
        //screen.debug() prints body
        render(<CounterApp value={value}/>)
        const buttonReset = screen.getByRole('button', { name: 'btn-reset'})
        const buttonAdd = screen.getByRole('button', { name: '+1'})
        const h2 = screen.getByRole('heading', { level: 2 })
        fireEvent.click(buttonAdd)
        // screen.debug()
        fireEvent.click(buttonAdd)
        // screen.debug()
        fireEvent.click(buttonReset)
        expect(h2.innerHTML).toContain(`${value}`)
    })
})