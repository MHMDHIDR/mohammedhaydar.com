declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"cst3135-project-coursework-m00570972/index.md": {
	id: "cst3135-project-coursework-m00570972/index.md";
  slug: "cst3135-project-coursework-m00570972";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"evolution-of-electronic-music-and-audio-synthesis-a-comprehensive-overview/index.md": {
	id: "evolution-of-electronic-music-and-audio-synthesis-a-comprehensive-overview/index.md";
  slug: "evolution-of-electronic-music-and-audio-synthesis-a-comprehensive-overview";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"exploring-3d-sound-and-images-a-journey-into-haas-and-anaglyph/index.md": {
	id: "exploring-3d-sound-and-images-a-journey-into-haas-and-anaglyph/index.md";
  slug: "exploring-3d-sound-and-images-a-journey-into-haas-and-anaglyph";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"exploring-the-art-of-image-synthesis-unleashing-terragen/index.md": {
	id: "exploring-the-art-of-image-synthesis-unleashing-terragen/index.md";
  slug: "exploring-the-art-of-image-synthesis-unleashing-terragen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"exploring-vcv-rack-your-gateway-to-virtual-modular-synthesis/index.md": {
	id: "exploring-vcv-rack-your-gateway-to-virtual-modular-synthesis/index.md";
  slug: "exploring-vcv-rack-your-gateway-to-virtual-modular-synthesis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"getting-to-grips-with-data-exploring-the-fusion-of-sound-and-images/index.md": {
	id: "getting-to-grips-with-data-exploring-the-fusion-of-sound-and-images/index.md";
  slug: "getting-to-grips-with-data-exploring-the-fusion-of-sound-and-images";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-install-nodejs/index.md": {
	id: "how-to-install-nodejs/index.md";
  slug: "how-to-install-nodejs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"image-filters-design-a-dive-on-convolution/index.md": {
	id: "image-filters-design-a-dive-on-convolution/index.md";
  slug: "image-filters-design-a-dive-on-convolution";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"sampling-theory-and-compression/index.md": {
	id: "sampling-theory-and-compression/index.md";
  slug: "sampling-theory-and-compression";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"sonification-turning-data-into-sound/index.md": {
	id: "sonification-turning-data-into-sound/index.md";
  slug: "sonification-turning-data-into-sound";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"the-intriguing-world-of-steganography-unveiling-hidden-messages-in-the-digital-age/index.md": {
	id: "the-intriguing-world-of-steganography-unveiling-hidden-messages-in-the-digital-age/index.md";
  slug: "the-intriguing-world-of-steganography-unveiling-hidden-messages-in-the-digital-age";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"understanding-morphing-image-transformation/index.md": {
	id: "understanding-morphing-image-transformation/index.md";
  slug: "understanding-morphing-image-transformation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vj-effects-discovering-visual-creativity/index.md": {
	id: "vj-effects-discovering-visual-creativity/index.md";
  slug: "vj-effects-discovering-visual-creativity";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"web-design-trends-2023/index.md": {
	id: "web-design-trends-2023/index.md";
  slug: "web-design-trends-2023";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"wordpress-a-powerful-platform-for-e-commerce-stores/index.md": {
	id: "wordpress-a-powerful-platform-for-e-commerce-stores/index.md";
  slug: "wordpress-a-powerful-platform-for-e-commerce-stores";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
