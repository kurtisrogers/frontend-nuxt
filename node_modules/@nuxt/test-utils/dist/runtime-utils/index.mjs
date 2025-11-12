import { defineEventHandler } from 'h3';
import { mount } from '@vue/test-utils';
import { reactive, h as h$1, Suspense, nextTick, effectScope, unref, isReadonly, getCurrentInstance, isRef, defineComponent as defineComponent$1 } from 'vue';
import { defu } from 'defu';
import { defineComponent, useRouter, h, tryUseNuxtApp } from '#imports';
import NuxtRoot from '#build/root-component.mjs';

const endpointRegistry = {};
function registerEndpoint(url, options) {
  const app = window.__app;
  if (!app) {
    throw new Error("registerEndpoint() can only be used in a `@nuxt/test-utils` runtime environment");
  }
  const config = typeof options === "function" ? { handler: options, method: void 0 } : options;
  config.handler = defineEventHandler(config.handler);
  const hasBeenRegistered = window.__registry.has(url);
  endpointRegistry[url] ||= [];
  endpointRegistry[url].push(config);
  if (!hasBeenRegistered) {
    window.__registry.add(url);
    app.use("/_" + url, defineEventHandler((event) => {
      const latestHandler = [...endpointRegistry[url] || []].reverse().find((config2) => config2.method ? event.method === config2.method : true);
      return latestHandler?.handler(event);
    }), {
      match(_, event) {
        return endpointRegistry[url]?.some((config2) => config2.method ? event?.method === config2.method : true) ?? false;
      }
    });
  }
  return () => {
    endpointRegistry[url]?.splice(endpointRegistry[url].indexOf(config), 1);
    if (endpointRegistry[url]?.length === 0) {
      window.__registry.delete(url);
    }
  };
}
function mockNuxtImport(_name, _factory) {
  throw new Error(
    "mockNuxtImport() is a macro and it did not get transpiled. This may be an internal bug of @nuxt/test-utils."
  );
}
function mockComponent(_path, _component) {
  throw new Error(
    "mockComponent() is a macro and it did not get transpiled. This may be an internal bug of @nuxt/test-utils."
  );
}

const RouterLink = defineComponent({
  functional: true,
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    custom: Boolean,
    replace: Boolean,
    // Not implemented
    activeClass: String,
    exactActiveClass: String,
    ariaCurrentValue: String
  },
  setup: (props, { slots }) => {
    const navigate = () => {
    };
    return () => {
      const route = useRouter().resolve(props.to);
      return props.custom ? slots.default?.({ href: route.href, navigate, route }) : h(
        "a",
        {
          href: route.href,
          onClick: (e) => {
            e.preventDefault();
            return navigate();
          }
        },
        slots
      );
    };
  }
});

async function mountSuspended(component, options) {
  const {
    props = {},
    attrs = {},
    slots = {},
    route = "/",
    ..._options
  } = options || {};
  for (const cleanupFunction of globalThis.__cleanup || []) {
    cleanupFunction();
  }
  const vueApp = tryUseNuxtApp()?.vueApp || globalThis.__unctx__.get("nuxt-app").tryUse().vueApp;
  const { render, setup, data, computed, methods } = component;
  let setupContext;
  let setupState;
  const setProps = reactive({});
  let interceptedEmit = null;
  function getInterceptedEmitFunction(emit) {
    if (emit !== interceptedEmit) {
      interceptedEmit = interceptedEmit ?? ((event, ...args) => {
        emit(event, ...args);
        setupContext.emit(event, ...args);
      });
    }
    return interceptedEmit;
  }
  function interceptEmitOnCurrentInstance() {
    const currentInstance = getCurrentInstance();
    if (!currentInstance) {
      return;
    }
    currentInstance.emit = getInterceptedEmitFunction(currentInstance.emit);
  }
  let passedProps;
  let componentScope = null;
  const wrappedSetup = async (props2, setupContext2) => {
    interceptEmitOnCurrentInstance();
    passedProps = props2;
    if (setup) {
      let result;
      if (options?.scoped) {
        componentScope = effectScope();
        globalThis.__cleanup ||= [];
        globalThis.__cleanup.push(() => {
          componentScope?.stop();
        });
        result = await componentScope?.run(async () => {
          return await setup(props2, setupContext2);
        });
      } else {
        result = await setup(props2, setupContext2);
      }
      setupState = result && typeof result === "object" ? result : {};
      return result;
    }
  };
  return new Promise(
    (resolve) => {
      const vm = mount(
        {
          setup: (props2, ctx) => {
            setupContext = ctx;
            if (options?.scoped) {
              const scope = effectScope();
              globalThis.__cleanup ||= [];
              globalThis.__cleanup.push(() => {
                scope.stop();
              });
              return scope.run(() => NuxtRoot.setup(props2, {
                ...ctx,
                expose: () => {
                }
              }));
            } else {
              return NuxtRoot.setup(props2, {
                ...ctx,
                expose: () => {
                }
              });
            }
          },
          render: (renderContext) => h$1(
            Suspense,
            {
              onResolve: () => nextTick().then(() => {
                vm.setupState = setupState;
                vm.__setProps = (props2) => {
                  Object.assign(setProps, props2);
                };
                resolve(wrappedMountedWrapper(vm));
              })
            },
            {
              default: () => h$1({
                name: "MountSuspendedHelper",
                async setup() {
                  const router = useRouter();
                  await router.replace(route);
                  const clonedComponent = {
                    name: "MountSuspendedComponent",
                    ...component,
                    render: render ? function(_ctx, ...args) {
                      interceptEmitOnCurrentInstance();
                      if (data && typeof data === "function") {
                        const dataObject = data();
                        for (const key in dataObject) {
                          renderContext[key] = dataObject[key];
                        }
                      }
                      for (const key in setupState || {}) {
                        const warn = console.warn;
                        console.warn = () => {
                        };
                        try {
                          renderContext[key] = isReadonly(setupState[key]) ? unref(setupState[key]) : setupState[key];
                        } catch {
                        } finally {
                          console.warn = warn;
                        }
                        if (key === "props") {
                          renderContext[key] = cloneProps$1(renderContext[key]);
                        }
                      }
                      const propsContext = "props" in renderContext ? renderContext.props : renderContext;
                      for (const key in props || {}) {
                        propsContext[key] = _ctx[key];
                      }
                      for (const key in passedProps || {}) {
                        propsContext[key] = passedProps[key];
                      }
                      if (methods && typeof methods === "object") {
                        for (const [key, value] of Object.entries(methods)) {
                          renderContext[key] = value.bind(renderContext);
                        }
                      }
                      if (computed && typeof computed === "object") {
                        for (const [key, value] of Object.entries(computed)) {
                          if ("get" in value) {
                            renderContext[key] = value.get.call(renderContext);
                          } else {
                            renderContext[key] = value.call(renderContext);
                          }
                        }
                      }
                      return render.call(this, renderContext, ...args);
                    } : void 0,
                    setup: (props2) => wrappedSetup(props2, setupContext)
                  };
                  return () => h$1(clonedComponent, { ...props, ...setProps, ...attrs }, slots);
                }
              })
            }
          )
        },
        defu(
          _options,
          {
            slots,
            attrs,
            global: {
              config: {
                globalProperties: vueApp.config.globalProperties
              },
              directives: vueApp._context.directives,
              provide: vueApp._context.provides,
              stubs: {
                Suspense: false,
                MountSuspendedHelper: false,
                [component && typeof component === "object" && "name" in component && typeof component.name === "string" ? component.name : "MountSuspendedComponent"]: false
              },
              components: { ...vueApp._context.components, RouterLink }
            }
          }
        )
      );
    }
  );
}
function cloneProps$1(props) {
  const newProps = reactive({});
  for (const key in props) {
    newProps[key] = props[key];
  }
  return newProps;
}
function wrappedMountedWrapper(wrapper) {
  const proxy = new Proxy(wrapper, {
    get: (target, prop, receiver) => {
      if (prop === "element") {
        const component = target.findComponent({ name: "MountSuspendedComponent" });
        return component[prop];
      } else if (prop === "vm") {
        const vm = Reflect.get(target, prop, receiver);
        return createVMProxy(vm, wrapper.setupState);
      } else {
        return Reflect.get(target, prop, receiver);
      }
    }
  });
  for (const key of ["props"]) {
    proxy[key] = new Proxy(wrapper[key], {
      apply: (target, thisArg, args) => {
        const component = thisArg.findComponent({ name: "MountSuspendedComponent" });
        return component[key](...args);
      }
    });
  }
  return proxy;
}
function createVMProxy(vm, setupState) {
  return new Proxy(vm, {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      if (setupState && typeof setupState === "object" && key in setupState) {
        return unref(setupState[key]);
      }
      return value;
    },
    set(target, key, value, receiver) {
      if (setupState && typeof setupState === "object" && key in setupState) {
        const setupValue = setupState[key];
        if (setupValue && isRef(setupValue)) {
          setupValue.value = value;
          return true;
        }
        return Reflect.set(setupState, key, value, receiver);
      }
      return Reflect.set(target, key, value, receiver);
    }
  });
}

const WRAPPER_EL_ID = "test-wrapper";
async function renderSuspended(component, options) {
  const {
    props = {},
    attrs = {},
    slots = {},
    route = "/",
    ..._options
  } = options || {};
  const { render: renderFromTestingLibrary } = await import('@testing-library/vue');
  const vueApp = tryUseNuxtApp()?.vueApp || globalThis.__unctx__.get("nuxt-app").tryUse().vueApp;
  const { render, setup, data, computed, methods } = component;
  let setupContext;
  let setupState;
  let interceptedEmit = null;
  function getInterceptedEmitFunction(emit) {
    if (emit !== interceptedEmit) {
      interceptedEmit = interceptedEmit ?? ((event, ...args) => {
        emit(event, ...args);
        setupContext.emit(event, ...args);
      });
    }
    return interceptedEmit;
  }
  function interceptEmitOnCurrentInstance() {
    const currentInstance = getCurrentInstance();
    if (!currentInstance) {
      return;
    }
    currentInstance.emit = getInterceptedEmitFunction(currentInstance.emit);
  }
  for (const fn of window.__cleanup || []) {
    fn();
  }
  document.querySelector(`#${WRAPPER_EL_ID}`)?.remove();
  let passedProps;
  const wrappedSetup = async (props2, setupContext2) => {
    interceptEmitOnCurrentInstance();
    passedProps = props2;
    if (setup) {
      const result = await setup(props2, setupContext2);
      setupState = result && typeof result === "object" ? result : {};
      return result;
    }
  };
  const WrapperComponent = defineComponent$1({
    inheritAttrs: false,
    render() {
      return h$1("div", { id: WRAPPER_EL_ID }, this.$slots.default?.());
    }
  });
  return new Promise((resolve) => {
    const utils = renderFromTestingLibrary(
      {
        setup: (props2, ctx) => {
          setupContext = ctx;
          const scope = effectScope();
          window.__cleanup ||= [];
          window.__cleanup.push(() => {
            scope.stop();
          });
          return scope.run(() => NuxtRoot.setup(props2, {
            ...ctx,
            expose: () => ({})
          }));
        },
        render: (renderContext) => (
          // See discussions in https://github.com/testing-library/vue-testing-library/issues/230
          // we add this additional root element because otherwise testing-library breaks
          // because there's no root element while Suspense is resolving
          h$1(
            WrapperComponent,
            {},
            {
              default: () => h$1(
                Suspense,
                {
                  onResolve: () => nextTick().then(() => {
                    utils.setupState = setupState;
                    resolve(utils);
                  })
                },
                {
                  default: () => h$1({
                    name: "RenderHelper",
                    async setup() {
                      const router = useRouter();
                      await router.replace(route);
                      const clonedComponent = {
                        name: "RenderSuspendedComponent",
                        ...component,
                        render: render ? function(_ctx, ...args) {
                          interceptEmitOnCurrentInstance();
                          if (data && typeof data === "function") {
                            const dataObject = data();
                            for (const key in dataObject) {
                              renderContext[key] = dataObject[key];
                            }
                          }
                          for (const key in setupState || {}) {
                            const warn = console.warn;
                            console.warn = () => {
                            };
                            try {
                              renderContext[key] = isReadonly(setupState[key]) ? unref(setupState[key]) : setupState[key];
                            } catch {
                            } finally {
                              console.warn = warn;
                            }
                            if (key === "props") {
                              renderContext[key] = cloneProps(renderContext[key]);
                            }
                          }
                          const propsContext = "props" in renderContext ? renderContext.props : renderContext;
                          for (const key in props || {}) {
                            propsContext[key] = _ctx[key];
                          }
                          for (const key in passedProps || {}) {
                            propsContext[key] = passedProps[key];
                          }
                          if (methods && typeof methods === "object") {
                            for (const [key, value] of Object.entries(methods)) {
                              renderContext[key] = value.bind(renderContext);
                            }
                          }
                          if (computed && typeof computed === "object") {
                            for (const [key, value] of Object.entries(computed)) {
                              if ("get" in value) {
                                renderContext[key] = value.get.call(renderContext);
                              } else {
                                renderContext[key] = value.call(renderContext);
                              }
                            }
                          }
                          return render.call(this, renderContext, ...args);
                        } : void 0,
                        setup: (props2) => wrappedSetup(props2, setupContext)
                      };
                      return () => h$1(clonedComponent, { ...props && typeof props === "object" ? props : {}, ...attrs }, slots);
                    }
                  })
                }
              )
            }
          )
        )
      },
      defu(_options, {
        slots,
        attrs,
        global: {
          config: {
            globalProperties: vueApp.config.globalProperties
          },
          directives: vueApp._context.directives,
          provide: vueApp._context.provides,
          components: { RouterLink }
        }
      })
    );
  });
}
function cloneProps(props) {
  const newProps = reactive({});
  for (const key in props) {
    newProps[key] = props[key];
  }
  return newProps;
}

export { mockComponent, mockNuxtImport, mountSuspended, registerEndpoint, renderSuspended };
