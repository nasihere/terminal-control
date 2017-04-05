export interface IEnvVars {
	[key: string]: string;
}
export function splitVars (str: string): IEnvVars {
	let varsObj={}
	let envVars = str.trim().replace(/;$/,"").split(";")
		.map(o => o.trim().split("="))
		.forEach((s)=>{console.log(s)
			let key=s[0].trim();
			let val=s[1].trim();
			varsObj[key]=val
		});
	return varsObj;
}