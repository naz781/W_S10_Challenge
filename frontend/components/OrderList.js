import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { switchSize } from '../state/OrderListSlice';
import { useGetOrdersQuery } from '../state/OrdersApi';

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery();
  const sizeFilter = useSelector(state => state.orderList.orderFilterSelector);
  const dispatch = useDispatch();

  const filteredOrders = orders?.filter(order => 
    sizeFilter === 'All' || order.size === sizeFilter
  );

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders?.map((order, index) => (
          <li key={index}>
            <div>
              {`${order.customer} ordered a size ${order.size} with ${order.toppings?.length || 'no'} topping${order.toppings?.length !== 1 ? 's' : ''}`}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => {
          const className = `button-filter${size === sizeFilter ? ' active' : ''}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={() => dispatch(switchSize(size))}
              key={size}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
