export declare namespace SendAnimationEventHook {
	class Context {
		selfId: number;
		animEventName: string;
		storage: Map<string, any>;
	}

	class LeaveContext extends Context {
		animationSucceeded: boolean;
	}

	class Handler {
		enter(ctx: Context): void;
		leave(ctx: LeaveContext): void;
	}

	class Target {
		add(handler: Handler): void;
	}
}
