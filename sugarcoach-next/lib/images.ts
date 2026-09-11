/**
 * Imágenes centralizadas.
 *
 * - Logo: el usuario lo aporta en `public/images/logo/` (ver README de esa
 *   carpeta). Mientras tanto se usa el remoto de la landing de ejemplo.
 *   Cuando el archivo local exista, cambiar LOGO_SRC a la ruta local.
 * - Resto: remotas tal cual la landing de ejemplo (`fileSobreNosotros.html`),
 *   como se acordó. `next.config.mjs` ya permite `lh3.googleusercontent.com`.
 */

// Cambiar a "/images/logo/sugarcoach-logo.png" (o .webp/.svg) cuando el
// archivo esté en `public/images/logo/`.
export const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida/AEtjO1VZ1rQjn8lEMaNV7dd3v2vvNPw8KSs9b3tM4RzhGDmgoxCDWrVR9BEuZy6irWoChLnfZYhgNxHc4_wDtoPOmn5YOXMtaeSAljGosAxMEzpmVGSKMn_bnNjPftoovMCQWygsXjFAG_ZAWqRgrnlPtczTk_U4rz8LA5HU-Q9BOMBT9zF0JEpdBuCU9L6_VHdPNpyGOFJHUt9eIiaZS4k03N8FP31oI3mq_Fmae52mFDSlscwV-s5SHywj9WKYsk_JwyYMfB6NGjur";

export const PHONES = {
  home: "https://lh3.googleusercontent.com/aida/AEtjO1VeAZlku6QabLCfn_OrQDv7AcLQXKiW0_JP3zn7TQxqKOE6g6hN5KfA3AnKfAV6u89W2lynCE1fQ1kUg5FnYpsxQv-wkpFfOqFLT96XZPrji44VvsHA9mgTNury8w7XJ6g5MDkVnC7Vm2hWdPGnEug6eaUiEmWopPQGJ9NoVk-42--nS_yAy8YotvqfpS7cNQ8XHeFhzkXjPdHd5pCGopmks4BvL_IvFhX_mpX7PstkXfrPR7lZ1JEZ9ExjC4ziPwKjPg9TTxHY",
  dailyLog:
    "https://lh3.googleusercontent.com/aida/AEtjO1Wq5urAXar6jKF5Fovsx6d92eOfXHTcYnWXCZHVKD-wkmwSd0QqD35yOuSAnxCOsNsNLuxwczcnqBOKJkVS5HGiio6EKqyreWEMYQbLV_mie2iSt7bSnbcjF4oeJi7I-EK0Y-fVCPyXC9VT86iSyr8tubkPPEhpUmaz6YDk5QUbKGV6mQhnf5TcklzxAVmn0XCLlBFXJwgssLWjXIhZI8SGd-KBi9NSffIGjgM4P6Ya9961uQ2WLJWyE9UDlhAdMeUTapzgh0WI-g",
  registro:
    "https://lh3.googleusercontent.com/aida/AEtjO1VirR7JlF1jQekd-g3Q7O7FH1RpKfShwUEgLuDSc4UIV60xxl-HEj9epFgZelSw9JbzTFjvATrtW3kO-4UOrgFrDTS2euV5ev8tA22EB6KREqtE72LNzzj90R8VVvxap20qP5OrdPQmFg2uw_qosTQiIl7GKnFIt5KNFMAPAN4tKiiaN7HxuwB50bYFIUN45MhhVz9gsoVpMBfZk_MeRl2Z9EKosZcY97o6QMANoknaFMAWzsM8VxsyNd_icxCksfFV_UuzGooxRQ",
  treatment:
    "https://lh3.googleusercontent.com/aida/AEtjO1WQLeZMWLi4ssnWNT0j_EHMpyjjClt-xrkVMtu3Am0ak-ErBc5vO42PN3E3SPRA7iTgpDgY2FKmJvIkJV5E-bYxbQD34I3vy8OhaH_JSaIvLjierJdnfh2msemNaJsTpEH9VNjWw0UMfrolzfg3L0rQkUO36xb-PUsJZAeJ8K_Jn6EbiuKrRn3mgRoYAXLGmhugi0byfcV7m5zcFY32yAuzEG85w07fDmJ5izuxicjufmiz80PHM1wAVvwaHwS6WOUQC7PslNrfCQ",
} as const;

export const TEAM_PHOTOS: Record<string, string> = {
  "isabel-berizzo":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAemLGwLzSkpSFnx-Lge-pyS1uubrTmvS_tbzitiAaF2kp5_vZdf_9NYtBcM7Qd9PwnhEwlFitSZwShtVTDLxvbQ0YD7QWDwbCpntEDGjw5Ms9PZHAwH01gBF196Eq6bMjlVjRfc7OVezPp2Tvu0lLSwrmFUPqsvHmUclVGFBFSfMs4ewAdfUYHx4HbeC4-Amq32bqccS_ZfWvS9JbtFNB0GRwopzAKXGnLhGLiSd--SXav89CZCjdByOBKsv1UEkacCA",
  "veronica-avendano":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD-DVXJupTE0skdbOAaVDQe2fHP_sjNT6zrWHKC5gK3whYcIQZaXJyklpdl5pUKPtybw9WQjWdZ2e4LFjPHfowtI_vY1FsJIS34_mt4HvFQTXdszxZico0U9qzvzQvQbw3_oEnqXfGamKaH3lWvTzxF7rSWdfHI0PHcroUpn9e7tZd5vw9OmGegKZDEiAG0xGs3Bohf-wOZr6Sr3ukEDmjwcH9kiXnJ4zcWlzY53REkDF2_byRy858XiPDoI1pxtuF9lA",
  "debora-biain":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC2JoDVm1r5gAdJkgggp9yUU0osl3Pfd9RxEfQDyg-a4qYbIpIiQw4v2SJQV-NmUcVT15XNXKZWv61-NivTrMPXpAmOVfUg4dN5Fv6p3V6z2d6nx0JFMo_Y0cOwnl4AKBXA9SXrggde2GvjGAxPZCgPKzEzhAfiZohuSL-EqisHi2b9WG1TvFmlBkii5PbvynzRJobqm-K48T1tI-YZJs8DMO7bEGi2Pl2WklCETamQYfeuATGcS6SQx0xSaWLuf2ffmQ",
  "agustina-olivo":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBd6Fbx8Oy9Ld6SYrg8XULR8k4ZY4CKon1mBiEgTBEmxL9MkIIsRfOA5HqIkM0Ro76TsXtG2kN_HW56CA60q7GpU4ncPM2pcRRPn3lJ9ZDVjpwXidCq7WqHv5Ei5F3JfoSouQIkUi5IO0-2xtuLQMcHAOInwYQ-rqoJgl2dj1Qd84rOpE8AKT4tmjfofA8Zsb8fqehIeCp6dI44-Yde2Js3_b1rCJ4OE5TyVGBsV3-yAehr5c44MtwdD0ycaYjNRtsANw",
  "karin-chmiel":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAcDRb0o4-k3Jt6zeIh6E75KmW7HIVsp8USMqCLjutNQ39_qqKa80g7NzrwzLuyVyQpM8WXuCUxS3ygDiGyOPehjrh-rB8E2d1HWDKd5B8l6UBXzm0URwIFbUouYlb33ikROIeGTME0firlhT1N7oGcOJ1gcrOET5zpb6mWG3SBuXXX5iU_2CXTVl1jetjd8GX1UgVn52i0KuG__RBFsGXeObjozi5ROPRL3cF-Ayu9b_T829zuMuiR7krg1FEK83tO3w",
};

export const MASCOT_SRC =
  "https://lh3.googleusercontent.com/aida/AEtjO1VZ1rQjn8lEMaNV7dd3v2vvNPw8KSs9b3tM4RzhGDmgoxCDWrVR9BEuZy6irWoChLnfZYhgNxHc4_wDtoPOmn5YOXMtaeSAljGosAxMEzpmVGSKMn_bnNjPftoovMCQWygsXjFAG_ZAWqRgrnlPtczTk_U4rz8LA5HU-Q9BOMBT9zF0JEpdBuCU9L6_VHdPNpyGOFJHUt9eIiaZS4k03N8FP31oI3mq_Fmae52mFDSlscwV-s5SHywj9WKYsk_JwyYMfB6NGjur";
