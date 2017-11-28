export interface IEnvVars {
	[key: string]: string;
}
export function splitVars (str: string): IEnvVars {
	if (!str) return null;
	let varsObj={}
	let envVars = str.trim().replace(/;$/,"").split(";")
		.map(o => o.trim().split("="))
		.forEach((s)=>{
			let key=(s[0]) ? s[0].trim() : '';
			let val=(s[1]) ? s[1].trim() : '';
			varsObj[key]=val
		});
	return varsObj;
}