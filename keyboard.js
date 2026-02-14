let winkeyhook;
try
{
    winkeyhook = await import("@toptensoftware/node-winkeyhook");
}
catch (err)
{
    console.log("Warning: failed to load node-winkeyhook, key handlers won't work");
}

export function key(options)
{
    let releaseHook = null;
    return {
        onActivate()
        {
            releaseHook = winkeyhook.hookKey(options.key, (ev) => {
                options.input?.(ev);
                if (ev.repeat && !(options.repeat ?? false))
                    return;
                if (ev.down)
                    options.press?.(ev);
                else
                    options.release?.(ev);
            });
        },

        onDeactivate()  
        {
            releaseHook?.();
            releaseHook = null;
        },
    }
}


export function keyEncoder(options)
{
    let releaseHookDown= null;
    let releaseHookUp= null;
    let scale = options?.scale || 1;
    return {
        onActivate(callback)
        {
            releaseHookDown = winkeyhook.hookKey(options.decKey, (ev) => {
                options.input?.(ev);
                if (ev.down)
                    options.adjust?.(-1 * scale);
            });
            releaseHookUp = winkeyhook.hookKey(options.incKey, (ev) => {
                options.input?.(ev);
                if (ev.down)
                    options.adjust?.(1 * scale);
            });
        },

        onDeactivate()
        {
            releaseHookDown?.();
            releaseHookUp?.();
            releaseHookDown = null; 
            releaseHookUp = null;
        },
    }
}

