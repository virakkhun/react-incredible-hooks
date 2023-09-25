import { useEffect } from 'react'
import { nullOrUndefined } from '../utils/null-or-undefined.util'

export interface intersectionObserverOptions {
	threshold?: number
	rootMargin?: string | undefined
	root?: Element | Document | null | undefined

	/**
	 * a target where you want it to observe
	 */
	target: string

	/**
	 * a class where you add to style base on your preferences
	 */
	className: string
}

/**
 * Trigger an element when reaching the target.
 * @params `threshold` , `rootMargin`, `root`, `target`, `className`
 * @types number, string | px | em | rem | etc, Element | Document | null | undefined, string, string
 * @return void
 * @see https://urh-react-hooks.vercel.app/docs/hooks/use-intersect
 */
export function useIntersectionObserver(options: intersectionObserverOptions) {
	const {
		threshold = 0,
		rootMargin = '0px',
		root = undefined,
		className,
		target,
	} = options

	const intersect = () => {
		if (nullOrUndefined(typeof IntersectionObserver))
			throw new Error('IntersectionObserver is not defined.')

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					entry.target.classList.toggle(className)

					if (entry.isIntersecting) observer.unobserve(entry.target)
				})
			},
			{
				threshold: threshold,
				root: root,
				rootMargin: rootMargin,
			},
		)

		document.querySelectorAll(target).forEach((t: Element) => {
			observer.observe(t)
		})
	}

	useEffect(() => {
		intersect()
	}, [intersect])
}
