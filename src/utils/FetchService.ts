class FetchService {
    private requestInterceptors: Array<(url: string, options: RequestInit) => void> = [];
    private responseInterceptors: Array<(response: Response) => void> = [];

    async get<T>(url: string): Promise<T> {
        return this._request('GET', url);
    }

    async post<T,U>(url: string, body: U): Promise<T> {
        return this._request('POST', url, body);
    }

    async put<T,U>(url: string, body: U): Promise<T> {
        return this._request('PUT', url, body);
    }

    async delete<T>(url: string): Promise<T> {
        return this._request('DELETE', url);
    }

    addRequestInterceptor(interceptor: (url: string, options: RequestInit) => void) {
        this.requestInterceptors.push(interceptor);
    }

    addResponseInterceptor(interceptor: (response: Response) => void) {
        this.responseInterceptors.push(interceptor);
    }

    private async _request<T,U>(method: string, url: string, body?: U): Promise<T> {
        let options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
        };
        if (body) {
        options.body = JSON.stringify(body);
        }
        this.runRequestInterceptors(url, options);
        const response = await fetch(url, options);
        this.runResponseInterceptors(response);
        if (!response.ok) {
        throw new Error(response.statusText);
        }
        const data: T = await response.json();
        return data;
    }

    private runRequestInterceptors(url: string, options: RequestInit) {
        this.requestInterceptors.forEach(interceptor => interceptor(url, options));
    }

    private runResponseInterceptors(response: Response) {
        this.responseInterceptors.forEach(interceptor => interceptor(response));
    }
}


const fetchService = new FetchService();

// 添加一个请求拦截器
fetchService.addRequestInterceptor((url, options) => {
    options.headers = {
        ...options.headers,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
    });

    // 添加一个响应拦截器
    fetchService.addResponseInterceptor(response => {
    if (response.status === 401) {
        console.error('Unauthorized!');
    }
});

export default fetchService;
