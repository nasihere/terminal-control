export function parseAvailableServices(state,action){
	let newItems;
	if(!action.payload.success){
		return Object.assign({}, state, {services: {error: action.payload.error}});
	}
	if(state.services && state.services.items){
		let items=action.payload.config.configService;
		let filterItems;
		if(state.services.items.length > items.length){
			filterItems=items.map((item,idx)=>
				state.services.items.find((serviceItem)=> item.id === serviceItem.id ));
			newItems=filterItems;
		}
		else if(state.services.items.length < items.length) {
			filterItems = items
				.filter((item, idx) => !state.services.items[idx] || item.id !== state.services.items[idx].id)
				.map((item, idx) => item)

			newItems = [...state.services.items, ...filterItems];


		}
		else{
			filterItems = items.map((item, idx) => Object.assign({},state.services.items[idx],item))
			newItems=filterItems
		}
	}
	else{
		newItems=action.payload;

	}
	return Object.assign({}, state, {services: {items: newItems}});
}