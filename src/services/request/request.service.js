const request = (url) => {
    const controller = new AbortController();
    const signal = controller.signal;

    return {
        promise: new Promise((resolve, reject) => {
            if (!url) {
                reject();
                return;
            }

            fetch(url, {
                method: 'GET',
                mode: 'cors',
                cache: 'default',
                signal
            }).then(res => {
                if (res && res.ok === false) {
                    reject(res);
                } else {
                    return res.json();
                }
            })
            .then(
                (result) => {
                    resolve(result);
                },
                (error) => {
                    if (!signal.aborted) {
                        reject();
                    }
                }
            )
        }),
        cancel: () => {
            if (controller && controller.abort) {
                controller.abort();
            }
        }
    }
};


export default request;