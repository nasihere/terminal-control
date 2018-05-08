export function mergeSingleObj(arr,obj,compKey){
	return arr.map((item)=>{
		if(item[compKey]===obj[compKey]){
			return Object.assign({},item,obj)
		}
		else {return item}
	})
}