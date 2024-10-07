import React, { useReducer } from 'react';
import { useCreateOrderMutation } from '../state/OrdersApi';

const inputFeilds = 'inputFeilds';
const FormReset = 'FormReset';

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case inputFeilds: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case FormReset:
      return { ...initialFormState };
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [createOrder, { error: badTimes, isLoading }] = useCreateOrderMutation();
  const [state, dispatch] = useReducer(reducer, initialFormState);

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;

    if (type === 'checkbox') {
      dispatch({ type: inputFeilds, payload: { name, value: checked } });
    } else {
      dispatch({ type: inputFeilds, payload: { name, value } });
    }
  };

  const resetForm = () => {
    dispatch({ type: FormReset });
  };

  const onNewOrder = evt => {
    evt.preventDefault();

    const toppings = Object.keys(state).filter(
      key => state[key] && key !== 'fullName' && key !== 'size'
    );

    const payload = {
      fullName: state.fullName,
      size: state.size,
      toppings,
    };

    createOrder(payload)
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {badTimes && <div className='failure'>Order failed: {badTimes.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onChange} checked={state['1']} />
          Pepperoni<br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onChange} checked={state['2']} />
          Green Peppers<br />
        </label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onChange} checked={state['3']} />
          Pineapple<br />
        </label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onChange} checked={state['4']} />
          Mushrooms<br />
        </label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onChange} checked={state['5']} />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
