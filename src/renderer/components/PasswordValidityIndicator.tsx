import { PasswordInvalidityState } from '../hooks/usePasswordValidation';

type PasswordValidityIndicatorProps = {
  params: PasswordInvalidityState[];
};

export default function PasswordValidityIndicator({
  params,
}: PasswordValidityIndicatorProps) {
  return params.length > 0 ? (
    <>
      <p className="text-xs font-semibold">A strong password should contain:</p>
      <ul className="text-xs text-red-500 px-1">
        {params.map((vp) => (
          <li key={vp}>{vp}</li>
        ))}
      </ul>
    </>
  ) : (
    <p className="text-xs font-semibold text-green-600 mt-1">
      ✅ Strong Password
    </p>
  );
}
