
let countState = $state(0);
export const useCountState = () => {
	return {
		get count() {
			return countState;
		},
		increment: () => countState++,
	};
};
