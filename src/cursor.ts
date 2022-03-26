import gsap from 'gsap'

interface Options {
    className: string
    container: string
    overwrite: boolean
    visible: boolean
    hideOnLeave: boolean
    speed: number
    skewingDelta: number
    skewingDeltaMax: number
    innerClassName: string
    textClassName: string
    mediaClassName: string
    mediaBoxClassName: string
    hiddenState: string
    activeState: string
    hideTimeout: number
    showTimeout: number
}
interface AllEvents {
    mousemove?: (e: MouseEvent) => any
    mouseup?: (e: MouseEvent) => any
    mouseleave?: (e: MouseEvent) => any
    mouseenter?: (e: MouseEvent) => any
    mousedown?: (e: MouseEvent) => any
    mousemoveOnce?: (e: MouseEvent) => any
}
interface Setter {
    [key: string]: any
}
export default class Cursor {
    el: HTMLDivElement
    container: HTMLElement
    inner: HTMLDivElement
    text: HTMLDivElement
    media: HTMLDivElement
    mediaBox: HTMLDivElement
    visibleInt: NodeJS.Timeout
    options: Options
    setter: Setter
    event: AllEvents
    ticker: any
    skewing = 4
    initalPos = [-window.innerWidth, -window.innerHeight]
    pos = {
        x: this.initalPos[0],
        y: this.initalPos[1]
    }
    vel = {
        x: 0,
        y: 0
    }
    visible = true
    constructor(opt: Options) {
        this.options = opt
        this.container = document.querySelector(this.options.container)!
        this.init()
        this.render(true)
        this.ticker = this.render.bind(this, false)
        gsap.ticker.add(this.ticker)
    }
    init() {
        this.el || this.create()
        this.event = {}
        this.createSetter()
        this.bind()
    }
    bind() {
        this.event.mouseleave = () => {
            return this.hide()
        }
        this.event.mouseenter = () => {
            return this.show()
        }
        this.event.mousedown = () => {
            return this.addState(this.options.activeState)
        }
        this.event.mouseup = () => {
            return this.removeState(this.options.activeState)
        }
        this.event.mousemoveOnce = () => {
            return this.show()
        }
        this.event.mousemove = e => {
            gsap.to(this.pos, {
                x: e.clientX,
                y: e.clientY,
                overwrite: this.options.overwrite,
                ease: 'expo.out' /*this.options.ease*/,
                duration: this.visible ? this.options.speed : 0,
                onUpdate: () => {
                    this.vel = {
                        x: e.clientX - this.pos.x,
                        y: e.clientY - this.pos.y
                    }
                }
            })
        }
        this.options.hideOnLeave &&
            this.container.addEventListener('mouseleave', this.event.mouseleave, {
                passive: !0
            }),
            this.options.visible &&
                this.container.addEventListener('mouseenter', this.event.mouseenter, {
                    passive: !0
                }),
            this.container.addEventListener('mousemove', this.event.mousemove!, { passive: true })
        this.container.addEventListener('mousedown', this.event.mousedown, {
            passive: !0
        })
        this.container.addEventListener('mouseup', this.event.mouseup, {
            passive: !0
        })
        this.options.visible &&
            this.container.addEventListener('mousemove', this.event.mousemoveOnce, {
                passive: !0,
                once: !0
            })
    }
    create() {
        ;(this.el = document.createElement('div')),
            (this.el.className = this.options.className),
            (this.inner = document.createElement('div')),
            (this.inner.className = this.options.innerClassName),
            (this.text = document.createElement('div')),
            (this.text.className = this.options.textClassName),
            (this.media = document.createElement('div')),
            (this.media.className = this.options.mediaClassName),
            (this.mediaBox = document.createElement('div')),
            (this.mediaBox.className = this.options.mediaBoxClassName),
            this.media.appendChild(this.mediaBox),
            this.inner.appendChild(this.media),
            this.inner.appendChild(this.text),
            this.el.appendChild(this.inner),
            this.container.appendChild(this.el)
    }
    createSetter() {
        this.setter = {
            x: gsap.quickSetter(this.el, 'x', 'px'),
            y: gsap.quickSetter(this.el, 'y', 'px'),
            rotation: gsap.quickSetter(this.el, 'rotation', 'deg'),
            scaleX: gsap.quickSetter(this.el, 'scaleX'),
            scaleY: gsap.quickSetter(this.el, 'scaleY'),
            wc: gsap.quickSetter(this.el, 'willChange'),
            inner: {
                rotation: gsap.quickSetter(this.inner, 'rotation', 'deg')
            }
        }
    }
    render(first: boolean) {
        if (first || (0 !== this.vel.y && 0 !== this.vel.x)) {
            if (
                (this.setter.wc('transform'),
                this.setter.x(this.pos.x),
                this.setter.y(this.pos.y),
                this.skewing)
            ) {
                var e = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2)),
                    n = Math.min(e * this.options.skewingDelta, this.options.skewingDeltaMax) * this.skewing,
                    i = (180 * Math.atan2(this.vel.y, this.vel.x)) / Math.PI
                this.setter.rotation(i)
                this.setter.scaleX(1 + n)
                this.setter.scaleY(1 - n)
                this.setter.inner.rotation(-i)
            }
        } else {
            this.setter.wc('auto')
        }
    }

    show() {
        clearInterval(this.visibleInt),
            this.el.classList.remove(this.options.hiddenState),
            (this.visibleInt = setTimeout(() => {
                return (this.visible = !0)
            }, this.options.showTimeout))
    }
    hide() {
        clearInterval(this.visibleInt),
            this.el.classList.add(this.options.hiddenState),
            (this.visibleInt = setTimeout(() => {
                return (this.visible = !1)
            }, this.options.hideTimeout))
    }
    toggle(t: boolean) {
        !this.visible || t ? this.show() : this.hide()
    }

    addState(t: string) {
        var e
        if (t === this.options.hiddenState) return this.hide()
        ;(e = this.el.classList).add.apply(e, t.split(' '))
    }

    removeState(t: string) {
        var e
        if (t === this.options.hiddenState) return this.show()
        ;(e = this.el.classList).remove.apply(e, t.split(' '))
    }
}
