export type UserProfile ={
  id: string
	name: string
	email: string
	age: number
}

// utility types
type FormInput = Omit<UserProfile, "id" | "age">;

// Discriminated Unions
type FormState<T> =
	| { status: "idle" } 
	| { status: "submitting" }
	| { status: "success", data: T }
	| { status: "error", errorMessage: string};
	

function handleFormState<T>(state: FormState<T>): string{
	switch(state.status){
		case "idle":
			return 'Form is ready.';
		case "submitting":
			return 'Submitting form data...';
		case "success":
			return `Successfully processed request for ${JSON.stringify(state.data)}`;
		case "error":
			return `Failed: ${state.errorMessage}`;
	}
}
// 🧪 TEST CASES (I-uncomment kapag tapos na):
const idleState: FormState<FormInput> = { status: "idle" };
const successState: FormState<FormInput> = { 
  status: "success", 
  data: { name: "Andrei", email: "andrei@test.com" } 
};
const errorState: FormState<FormInput> = { 
  status: "error", 
  errorMessage: "Invalid email format" 
};

console.log(handleFormState(idleState));    
console.log(handleFormState(successState)); 
console.log(handleFormState(errorState));   
