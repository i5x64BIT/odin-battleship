export default (() => {
    let events = {};
    let token = 0;

    const subscribe = (event, func) => {
        events[event] = [];
        token++;
        events[event].push({
            token,
            func,
        });
        return token;
    };

    const unsubscribe = (event, token) => {
        events[event] = events[event].filter((s) => !(s.token === token));
    };
    const publish = (event) => {
        events[event].forEach((s) => s.func());
    };

    return {
        subscribe,
        unsubscribe,
        publish,
    };
})();
