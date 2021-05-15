import { BehaviorSubject } from 'rxjs';

const initialState = {
    // 1st index of INITIAL_VALUES = minutes
    // 2nd index of INITIAL_VALUES = seconds
    // N.B. do not include leading zeros
    INITIAL_VALUES: [0, 5],
    isrunning: false,
    reset: false,
    expired: false
};
let state = initialState;
const subject = new BehaviorSubject(initialState);
const timeStore = {
    subscribe: setState => subject.subscribe(setState),
    sendData: (message) => {
        try {
            state = {
                ...state,
                ...message,
            };
            subject.next(state);
        } catch (e) {
            state = {
                ...state,
                error: e.message,
            };
            subject.next(state);
        }
    },

    initialState,
};

export default timeStore;
