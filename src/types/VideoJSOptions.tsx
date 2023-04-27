export interface JsOptions {
  muted: boolean,
  crossorigin: boolean,
  autoplay: boolean,
  controls: boolean,
  responsive: boolean,
  fluid: boolean,
  poster: string | boolean,
  sources: source[],
}

export interface source {
  src: string,
  type: string,
}