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
        if(!event) throw TypeError('An event is expected')
        if (!token) throw TypeError("A token is expected");
        if(events[event]) throw TypeError('No matching event found');
        
        const newSubs = events[event].filter((s) => !(s.token === token));
        if(newSubs.length === events[event].length) throw TypeError(`No token matching ${token} was found`)
        events[event] = newSubs;
    };
    const publish = (event) => {
        if(events[event] === undefined) throw TypeError(`"${event}" event has no subscribers yet.`)
        events[event].forEach((s) => s.func());
    };

    return {
        subscribe,
        unsubscribe,
        publish,
    };
})();
