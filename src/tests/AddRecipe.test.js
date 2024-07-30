import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import AddRecipe from '../components/AddRecipe';

test("test add new recipe form", () => {
    // Mock handleChange function
    const handleChange = jest.fn();

    render(
        <MemoryRouter>
            <AddRecipe handleChange={handleChange} />
        </MemoryRouter>
    )

    const componentTxt = screen.getByText(/Create new Recipe/i)
    expect(componentTxt).toBeInTheDocument()

    const savebtn = screen.getByRole('button', { name: /save/i })
    expect(savebtn).toBeInTheDocument()

    const inputElement = screen.getByPlaceholderText('Enter Recipe Title');
    fireEvent.change(inputElement, { target: { value: 'Test Recipe' } });
    expect(inputElement.value).toBe('Test Recipe');

    const descreptionElement = screen.getByPlaceholderText('Introduce your recipe');
    fireEvent.change(descreptionElement, { target: { value: 'Test Recipe' } });
    expect(descreptionElement.value).toBe('Test Recipe');

    const ingredientsElement = screen.getByPlaceholderText('Add Ingredients');
    fireEvent.change(ingredientsElement, { target: { value: 'Test Add Ingredients' } });
    expect(ingredientsElement.value).toBe('Test Add Ingredients');

    const InstructionElement = screen.getByPlaceholderText('Write Instruction');
    fireEvent.change(InstructionElement, { target: { value: 'Test Write Instruction' } });
    expect(InstructionElement.value).toBe('Test Write Instruction');

    const ServingsElement = screen.getByPlaceholderText('#Servings');
    fireEvent.change(ServingsElement, { target: { value: 'Test Write Servings' } });
    expect(ServingsElement.value).toBe('Test Write Servings');

    const cookTimeElements = screen.getAllByPlaceholderText('Hours 0');
    const specificCookTimeElement = cookTimeElements[0, 1];
    fireEvent.change(specificCookTimeElement, { target: { value: '1' } });
    expect(specificCookTimeElement.value).toBe('1');

    const prepTimeElements = screen.getAllByPlaceholderText('Minutes 0');
    const specificPrepTimeElement = prepTimeElements[0, 1];
    fireEvent.change(specificPrepTimeElement, { target: { value: '1' } });
    expect(specificPrepTimeElement.value).toBe('1');

    const selectBoxCuisine = screen.getByLabelText('Cuisine');
    expect(selectBoxCuisine).toBeInTheDocument();
    const selectBoxCollection = screen.getByLabelText('Collection');
    expect(selectBoxCollection).toBeInTheDocument();
});