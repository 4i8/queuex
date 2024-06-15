/**
 * The queuex class provides a simple and efficient way to manage Queuex sequences.
 */
export default class Queuex {
  static queuex_map: { [key: string]: any } = {};
  #$: any;
  #namespace: string;
  #callback: any;
  /**
   * Creates a new instance of the queuex class with the provided namespace and callback function.
   * @param {string} namespace - The namespace for the Queuex sequence.
   * @param {Function} callback - The callback function that takes a value, a next function, and an index as parameters.
   */
  constructor(
    namespace: string,
    callback: (value: any, next: () => void, index: number) => void
  ) {
    Queuex.queuex_map = Queuex.queuex_map || {};
    type status = "sleep" | "running";
    if (!Queuex.queuex_map[namespace]) {
      Queuex.queuex_map[namespace] = {
        pusher: [],
        index: -1,
        callback,
        status: "sleep" as status,
      };
    } else if (typeof callback === "function") {
      throw new Error(
        `namespace "${namespace}" already exists. Use a unique namespace`
      );
    }
    this.#namespace = namespace;
    this.#callback = Queuex.queuex_map[namespace].callback;
    this.#$ = Queuex.queuex_map[namespace];
  }
  /**
   * Moves the Queuex sequence to the next task and runs it.
   * @returns {void}
   */
  #next(): void {
    if (!this.#$) return;
    if (!this.#$.pusher.length) {
      this.#$.status = "sleep";
      return;
    }
    this.#$.status = "running";
    const value = this.#$.pusher[0];
    this.#$.pusher = this.#$.pusher.slice(1);
    this.#$.index++;
    this.#callback(value, this.#next.bind(this), this.#$.index);
    return;
  }
  /**
   * Adds a new task to the end of the Queuex sequence.
   * @param {any} task - The task to add to the Queuex sequence.
   * @returns {void}
   */
  public push(task: any): void {
    if (!this.#$) return;
    if (!this.#$.pusher.length && this.#$.status === "sleep") {
      this.#$.pusher.push(task);
      this.#$.status = "running";
      this.#next();
    } else {
      this.#$.pusher.push(task);
    }
  }
  /**
   * adds an array of items to the end of the Queuex sequence.
   * @param {any[]} tasks - The array of tasks to add to the Queuex sequence.
   * @returns {void}
   */
  public concat(tasks: any[]): void {
    if (!this.#$) return;
    if (!this.#$.pusher.length && this.#$.status === "sleep") {
      this.#$.pusher = this.#$.pusher.concat(tasks);
      this.#$.status = "running";
      this.#next();
    } else {
      this.#$.pusher = this.#$.pusher.concat(tasks);
    }
  }
  /**
   * Stops the current Queuex sequence and prevents any remaining tasks from running.
   * @returns {void}
   */
  public kill(): void {
    if (!this.#$) return;
    delete Queuex.queuex_map[this.#namespace];
    this.#$ = null;
    this.#callback = null;
  }
}
